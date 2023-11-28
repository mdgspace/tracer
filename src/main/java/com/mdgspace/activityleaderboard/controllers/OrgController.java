package com.mdgspace.activityleaderboard.controllers;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashSet;
import java.util.Set;

import com.mdgspace.activityleaderboard.models.Organization;
import com.mdgspace.activityleaderboard.models.User;
import com.mdgspace.activityleaderboard.models.enums.EOrgRole;
import com.mdgspace.activityleaderboard.models.roles.OrgRole;
import com.mdgspace.activityleaderboard.payload.request.AddMembersRequest;
import com.mdgspace.activityleaderboard.payload.request.AddOrgRequest;
import com.mdgspace.activityleaderboard.payload.response.AddMembersResponse;
import com.mdgspace.activityleaderboard.repository.OrgRepository;
import com.mdgspace.activityleaderboard.repository.OrgRoleRepository;
import com.mdgspace.activityleaderboard.repository.ProjectRepository;
import com.mdgspace.activityleaderboard.repository.ProjectRoleRepository;
import com.mdgspace.activityleaderboard.repository.UserRepository;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PutMapping;



@CrossOrigin(origins = "*",maxAge=3600)
@RestController
@Slf4j
@RequestMapping("/api/protected/org")
@Validated
public class OrgController {
      
    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    OrgRoleRepository orgRoleRepository;

    @Autowired
    ProjectRoleRepository projectRoleRepository;

    @Autowired
    OrgRepository orgRepository;


    @PostMapping("/add")
    public ResponseEntity<?> addOrg(@Valid @RequestBody AddOrgRequest addOrgRequest, Principal principal){
        try{
            String username = principal.getName();
            User user= userRepository.findByUsername(username).orElse(null);
            Organization org= orgRepository.findByName(addOrgRequest.getName()).orElse(null);
            if(org!=null){
                return ResponseEntity.badRequest().body("Organization with this name already created, please select another name");
            }
            Organization new_org = new Organization(addOrgRequest.getName(),addOrgRequest.getDescription(),null); 
            orgRepository.save(new_org);
            OrgRole orgRole=new OrgRole(EOrgRole.ADMIN,new_org, user);
            orgRoleRepository.save(orgRole);
            return ResponseEntity.ok().body("Organization created successfully");

        }catch(Exception e){
            log.error("Internal server error",e);
            return ResponseEntity.internalServerError().body("Internal server error");
        }

    }


    @DeleteMapping("/delete/{orgName}")
    public ResponseEntity<?> deleteOrg(@PathVariable String orgName, Principal principal ){
        try{
            
            Organization org=orgRepository.findByName(orgName).orElse(null);
            if(org==null){
                return ResponseEntity.badRequest().body("Organization does not exists");
            }

            String username= principal.getName();
            User user=userRepository.findByUsername(username).orElse(null);
            OrgRole orgRole=orgRoleRepository.findByOrganizationAndUser(org, user).orElse(null);
            if(orgRole==null){
                return ResponseEntity.badRequest().body("User is not a part of organization");
            }
            if(orgRole.getRole()!=EOrgRole.ADMIN){
                return ResponseEntity.badRequest().body("User is not the admin of the organization");
            }
            orgRepository.deleteById(org.getId());
            orgRoleRepository.deleteById(orgRole.getId());
            return ResponseEntity.ok().body("Organization deleted successfully");
            
            
        }catch(Exception e){
          log.error("Internal server error", e);
          return ResponseEntity.internalServerError().body("Internal server error");
        }
    }

    @PutMapping("/addMembers/{orgName}")
    public ResponseEntity<?> addMembers(@Valid @RequestBody AddMembersRequest addMembersRequest, @PathVariable String orgName,Principal principal){
        try{
          
            Organization org= orgRepository.findByName(orgName).orElse(null);
            if(org==null){
                return ResponseEntity.badRequest().body("Organization do not exist");
            }
            String username=principal.getName();
            User user=userRepository.findByUsername(username).orElse(null);
            OrgRole orgRole=orgRoleRepository.findByOrganizationAndUser(org, user).orElse(null);
            if(orgRole==null){
                return ResponseEntity.badRequest().body("User is not the admin of the organization");
            }
            if(orgRole.getRole()!=EOrgRole.ADMIN){
                return ResponseEntity.badRequest().body("User is not the admin of the organization");
            }
            Set<String> newMembersAdded=new HashSet<>();
            for(String member: addMembersRequest.getMembers()){
                User new_member=userRepository.findByUsername(member).orElse(null);
                if(new_member==null){
                    continue;
                }
                OrgRole new_memberOrgRole=orgRoleRepository.findByOrganizationAndUser(org, new_member).orElse(null);
                if(orgRole!=null){
                    continue;
                }
                OrgRole newMenberOrgRole=new OrgRole(EOrgRole.MEMBER,org,new_member);
                orgRoleRepository.save(newMenberOrgRole);
                newMembersAdded.add(member);

            }

            return ResponseEntity.ok().body(new AddMembersResponse(newMembersAdded));
            

        }catch(Exception e){
            log.error("Internal Server Error", e);
            return ResponseEntity.internalServerError().body("Internal Server Error");
        }
    }
    
















}
