package com.mdgspace.activityleaderboard.payload.request;

import java.io.Serializable;
import java.util.Map;



import lombok.Data;


@Data
public class ChangeProjectMembersStatusRequest  {
    private Map<String, String> projectMembersStatus;
}
