package com.mdgspace.activityleaderboard.payload.response;

import java.io.Serializable;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class GetUsersOrgs implements Serializable {
    private Map<String, String> userOrgsAndRoles;
}