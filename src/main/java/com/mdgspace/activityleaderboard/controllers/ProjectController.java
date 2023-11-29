package com.mdgspace.activityleaderboard.controllers;

import java.security.Principal;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mdgspace.activityleaderboard.models.Organization;
import com.mdgspace.activityleaderboard.models.Project;
import com.mdgspace.activityleaderboard.models.User;
import com.mdgspace.activityleaderboard.models.enums.EOrgRole;
import com.mdgspace.activityleaderboard.models.enums.EProjectRole;
import com.mdgspace.activityleaderboard.models.roles.OrgRole;
import com.mdgspace.activityleaderboard.models.roles.ProjectRole;
import com.mdgspace.activityleaderboard.payload.request.AddMembersRequest;
import com.mdgspace.activityleaderboard.payload.request.AddProjectRequest;
import com.mdgspace.activityleaderboard.payload.request.ChangeProjectMembersStatusRequest;
import com.mdgspace.activityleaderboard.payload.response.AddMembersResponse;
import com.mdgspace.activityleaderboard.payload.response.MessageResponse;
import com.mdgspace.activityleaderboard.repository.OrgRepository;
import com.mdgspace.activityleaderboard.repository.OrgRoleRepository;
import com.mdgspace.activityleaderboard.repository.ProjectRepository;
import com.mdgspace.activityleaderboard.repository.ProjectRoleRepository;
import com.mdgspace.activityleaderboard.repository.UserRepository;
import com.mdgspace.activityleaderboard.security.jwt.AuthEntryPointJwt;

import io.netty.handler.codec.MessageAggregationException;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController

@RequestMapping("/api/protected/project")
public class ProjectController {
  private static final Logger logger = LoggerFactory.getLogger(ProjectController.class);

  @Autowired
  UserRepository userRepository;

  @Autowired
  ProjectRepository projectRepository;

  @Autowired
  OrgRepository orgRepository;

  @Autowired
  OrgRoleRepository orgRoleRepository;

  @Autowired
  ProjectRoleRepository projectRoleRepository;

  @PostMapping("/add/{orgName}")
  public ResponseEntity<?> addProject(@Valid @RequestBody AddProjectRequest addProjectRequest,
      @PathVariable String orgName, Principal principal) {
    try {

      String username = principal.getName();

      Organization org = orgRepository.findByName(orgName).orElse(null);

      if (org == null) {
        return ResponseEntity.badRequest().body(new MessageResponse("This organisation doesnot exists"));
      }

      User user = userRepository.findByUsername(username).orElse(null);

      OrgRole orgRole = orgRoleRepository.findByOrganizationAndUser(org, user).orElse(null);
      if (orgRole == null) {
        return ResponseEntity.badRequest()
            .body(new MessageAggregationException("User doesnot belongs to Organization"));
      }
      if (orgRole.getRole() != EOrgRole.ADMIN && orgRole.getRole() != EOrgRole.MANAGER) {
        return ResponseEntity.badRequest()
            .body(new MessageResponse("User is not the admin or manager of the Organization"));
      }

      Project isProject = projectRepository.findByNameAndOrganization(addProjectRequest.getName(), org).orElse(null);
      if (isProject != null) {
        return ResponseEntity.badRequest().body("Project Name Already Taken");
      }

      Project new_Project = new Project(addProjectRequest.getName(), addProjectRequest.getLink(),
          addProjectRequest.getDescription(), org);

      projectRepository.save(new_Project);

      if (org.getName() == username + "/userspace") {

        ProjectRole projectRole = new ProjectRole(EProjectRole.ADMIN, new_Project, user);
        projectRoleRepository.save(projectRole);
      }

      return ResponseEntity.ok().body("Project added to this organization successfully");

    } catch (Exception e) {
      logger.error("Internal server error:", e);
      return ResponseEntity.internalServerError().body("Internal Server Error");

    }
  }

  @DeleteMapping("/delete/{projectName}/{orgName}")
  public ResponseEntity<?> deleteProject(@PathVariable String projectName, @PathVariable String orgName,
      Principal principal) {
    try {

      String username = principal.getName();
      Organization org = orgRepository.findByName(orgName).orElse(null);
      User user = userRepository.findByUsername(username).orElse(null);
      if (org == null) {
        return ResponseEntity.badRequest().body(new MessageResponse("This organisation doesnot exists"));
      }
      Project project = projectRepository.findByNameAndOrganization(projectName, org).orElse(null);
      if (project == null) {
        return ResponseEntity.badRequest()
            .body(new MessageResponse("This projectName does not exists in this organization"));
      }

      OrgRole orgRole = orgRoleRepository.findByOrganizationAndUser(org, user).orElse(null);

      if (orgRole.getRole() != EOrgRole.ADMIN && orgRole.getRole() != EOrgRole.MANAGER) {
        return ResponseEntity.badRequest()
            .body(new MessageResponse("User is not the admin or manager of organization"));
      }

      projectRepository.deleteById(project.getId());

      ProjectRole projectRole = projectRoleRepository.findByProjectAndUser(project, user).orElse(null);

      if (projectRole == null) {
        return ResponseEntity.badRequest().body("Project in this org doesnot exists");
      }
      projectRoleRepository.deleteById(projectRole.getId());
      return ResponseEntity.ok().body(new MessageResponse("Project deleted successfully"));

    } catch (Exception e) {
      logger.error("Internal server error", e);
      return ResponseEntity.internalServerError().body(new MessageResponse("Internal Server Error"));
    }
  }

  @PutMapping("/update/{projectName}/{orgName}")
  public ResponseEntity<?> updateProject(@Valid @RequestBody AddProjectRequest updateProjectRequest,
      @PathVariable String projectName, @PathVariable String orgName, Principal principal) {
    try {
      String username = principal.getName();
      Organization org = orgRepository.findByName(orgName).orElse(null);
      User user = userRepository.findByUsername(username).orElse(null);
      if (org == null) {
        return ResponseEntity.badRequest().body(new MessageResponse("Organization not found"));
      }
      Project project = projectRepository.findByNameAndOrganization(projectName, org).orElse(null);
      if (project == null) {
        return ResponseEntity.badRequest().body("Project do not exists in org");
      }
      OrgRole orgRole = orgRoleRepository.findByOrganizationAndUser(org, user).orElse(null);
      if (orgRole == null) {
        return ResponseEntity.badRequest().body("User is not the member of org");
      }
      if (orgRole.getRole() != EOrgRole.ADMIN && orgRole.getRole() != EOrgRole.MANAGER) {
        return ResponseEntity.badRequest().body("User is not the admin or manager of the org");
      }

      project.setName(updateProjectRequest.getName());
      project.setDescription(updateProjectRequest.getDescription());
      project.setLink(updateProjectRequest.getLink());

      return ResponseEntity.ok().body("Project details updated");

    } catch (Exception e) {
      logger.error("Internal server error", e);
      return ResponseEntity.internalServerError().body("Internal server error");
    }
  }

  @PutMapping("/addMembers/{projectName}/{orgName}")
  public ResponseEntity<?> addMembers(@Valid @RequestBody AddMembersRequest addMembersRequest,
      @PathVariable String projectName, @PathVariable String orgName, Principal principal) {
    try {

      String username= principal.getName();
      Organization org = orgRepository.findByName(orgName).orElse(null);
      User user=userRepository.findByUsername(username).orElse(null);
      if(org==null){
        return ResponseEntity.badRequest().body("Organization not found");
      }
      Project project= projectRepository.findByNameAndOrganization(projectName, org).orElse(null);
      OrgRole orgRole=orgRoleRepository.findByOrganizationAndUser(org, user).orElse(null);
      if(orgRole==null){
        return ResponseEntity.badRequest().body("User is not the member of Org");
      }
      if(project==null){
        return ResponseEntity.badRequest().body("Project does not exist in this org");
      }
      
      ProjectRole projectRole=projectRoleRepository.findByProjectAndUser(project, user).orElse(null);
      if((orgRole.getRole()!=EOrgRole.ADMIN && orgRole.getRole()!=EOrgRole.MANAGER)&&(projectRole!=null && projectRole.getRole()!=EProjectRole.ADMIN)){
            return ResponseEntity.badRequest().body("User is not the manager or admin of org neither he is a manager admin of project");
      }

      Set<String>  newMembersAdded=new HashSet<>();
      for(String member: addMembersRequest.getMembers()){
        User new_member=userRepository.findByUsername(member).orElse(null);
        if(new_member==null){
            continue;
        }
        OrgRole new_memberOrgRole=orgRoleRepository.findByOrganizationAndUser(org, new_member).orElse(null);
        if(new_memberOrgRole==null){
            continue;
        }

        ProjectRole new_memberProjectRole= projectRoleRepository.findByProjectAndUser(project, new_member).orElse(null);
        if(new_memberProjectRole!=null){
          continue;
        }
        ProjectRole newMemberProjectRole= new ProjectRole(EProjectRole.MEMBER,project,new_member);
        projectRoleRepository.save(newMemberProjectRole);
        
        newMembersAdded.add(member);

    }
    return ResponseEntity.ok().body(new AddMembersResponse(newMembersAdded));

    } catch (Exception e) {
      logger.error("Internal Server Error", e);
      return ResponseEntity.internalServerError().body("Internal Server Error");
    }
  }

  @PutMapping("/removeMembers/{projectName}/{orgName}")
  public ResponseEntity<?> removeMembers(@Valid @RequestBody AddMembersRequest removMembersRequest, @PathVariable String projectName,@PathVariable String orgName, Principal principal){
    try{
       
      String username= principal.getName();
      Organization org = orgRepository.findByName(orgName).orElse(null);
      User user=userRepository.findByUsername(username).orElse(null);
      if(org==null){
        return ResponseEntity.badRequest().body("Organization not found");
      }
      Project project= projectRepository.findByNameAndOrganization(projectName, org).orElse(null);
      OrgRole orgRole=orgRoleRepository.findByOrganizationAndUser(org, user).orElse(null);
      if(orgRole==null){
        return ResponseEntity.badRequest().body("User is not the member of Org");
      }
      if(project==null){
        return ResponseEntity.badRequest().body("Project does not exist in this org");
      }
      
      ProjectRole projectRole=projectRoleRepository.findByProjectAndUser(project, user).orElse(null);
      if((orgRole.getRole()!=EOrgRole.ADMIN && orgRole.getRole()!=EOrgRole.MANAGER)&&(projectRole!=null && projectRole.getRole()!=EProjectRole.ADMIN)){
            return ResponseEntity.badRequest().body("User is not the manager or admin of org neither he is a manager admin of project");
      }

      Set<String>  membersRemoved=new HashSet<>();
      for(String member: removMembersRequest.getMembers()){
        User projectMember=userRepository.findByUsername(member).orElse(null);
        if(projectMember==null){
            continue;
        }
        OrgRole projectMemberOrgRole=orgRoleRepository.findByOrganizationAndUser(org, projectMember).orElse(null);
        if(projectMemberOrgRole==null){
            continue;
        }

        ProjectRole projectMemberProjectRole= projectRoleRepository.findByProjectAndUser(project, projectMember).orElse(null);
        if(projectMemberProjectRole==null){
          continue;
        }
        
        projectRoleRepository.deleteById(projectMemberOrgRole.getId());
        membersRemoved.add(member);

    }
    return ResponseEntity.ok().body(new AddMembersResponse(membersRemoved));

    }catch (Exception e){
      logger.error("Internal server error", e);
      return ResponseEntity.internalServerError().body("Internal server error");
    }
  }


  @PutMapping("/changeStatus/{projectName}/{orgName}")
  public ResponseEntity<?> changeStatus(@Valid @RequestBody ChangeProjectMembersStatusRequest changeProjectMembersStatusRequest, @PathVariable String projectName, @PathVariable String orgName,Principal principal){
     try{

       Organization org= orgRepository.findByName(orgName).orElse(null);
        if(org==null){
            return ResponseEntity.badRequest().body("Organization do not exist");
        }
        String username=principal.getName();
        User user=userRepository.findByUsername(username).orElse(null);
        Project project=projectRepository.findByNameAndOrganization(projectName, org).orElse(null);
        if(project==null){
          return ResponseEntity.badRequest().body("Project does not belong to this organization");
        }
        OrgRole userOrgRole=orgRoleRepository.findByOrganizationAndUser(org, user).orElse(null);
        if(userOrgRole==null){
            return ResponseEntity.badRequest().body("User does not belong to organization");
        }
        if(userOrgRole.getRole()!=EOrgRole.ADMIN && userOrgRole.getRole()!=EOrgRole.MANAGER){
            return ResponseEntity.badRequest().body("User is not the admin or the manager of the organization");
        }
                                        
        Map<String,String> newStatus=changeProjectMembersStatusRequest.getProjectMembersStatus();
        for(Map.Entry<String, String> e: newStatus.entrySet()){
           String memberUsername=e.getKey();
           String newRole=e.getValue().toLowerCase();
           User projectMember=userRepository.findByUsername(memberUsername).orElse(null);
           if(projectMember==null){
            continue;
           }
           ProjectRole projectRole=projectRoleRepository.findByProjectAndUser(project, projectMember).orElse(null);
           if(projectRole==null){
            continue;
           }
           if(newRole=="admin"){
            projectRole.setRole(EProjectRole.ADMIN);;
           }
           else if(newRole=="member"){
            projectRole.setRole(EProjectRole.MEMBER);
           }
           
        }

        return ResponseEntity.ok().body("Roles changed successfully");

     }catch(Exception e){
         logger.error("Internal Server Error", e);
         return ResponseEntity.internalServerError().body("Internal Server Error");
     }
  }
}

