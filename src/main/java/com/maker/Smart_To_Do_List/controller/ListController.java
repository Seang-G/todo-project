package com.maker.Smart_To_Do_List.controller;



import com.maker.Smart_To_Do_List.dto.ChangeListNameRequest;
import com.maker.Smart_To_Do_List.dto.CreateListRequest;
import com.maker.Smart_To_Do_List.response.EmptyResponse;
import com.maker.Smart_To_Do_List.response.ToDoListResponse;
import com.maker.Smart_To_Do_List.response.ToDoListsResponse;
import com.maker.Smart_To_Do_List.service.JwtService;
import com.maker.Smart_To_Do_List.service.ListService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/list")
public class ListController {

    private final ListService listService;
    private final JwtService jwtService;

    
    /**
     * POST
     [createList]: 리스트 생성
     **/
    @PostMapping("/create")
    public ResponseEntity<ToDoListResponse> createList(@RequestBody CreateListRequest createListDto,
                                                       HttpServletRequest request){

        String userId = jwtService.getUserId(request);
        ToDoListResponse toDoListResponse = listService.createList(
                createListDto.getListName(),
                userId
        );

        return new ResponseEntity<>(toDoListResponse, HttpStatus.OK);
    }

    /**
     * GET
     * [getToDoLists]: 모든 리스트 조회
     * **/
    @GetMapping("/lists")
    public ResponseEntity<ToDoListsResponse> getToDoLists(HttpServletRequest request){
        String userId = jwtService.getUserId(request);
        final ToDoListsResponse toDoListsResponse = listService.getToDoLists(userId);
        return new ResponseEntity<>(toDoListsResponse, HttpStatus.OK);
    }

//    @GetMapping("/{listId}")
//    public ResponseEntity<?> getToDoList(HttpServletRequest request,
//                                         @PathVariable("listId") final String listId){
//
//        String userId = jwtService.getUserId(request);
//        ToDoListDto toDoListDto = listService.getToDoList(
//                userId,
//                listId
//        );
//        return new ResponseEntity<>(toDoListDto, HttpStatus.OK);
//    }

    /**
     * PUT
     * [changeToDoListName]: 투두리스트 이름 변경 API
     * **/
    @PutMapping("/{listId}")
    public ResponseEntity<EmptyResponse> changeToDoListName(HttpServletRequest request,
                                                            @RequestBody ChangeListNameRequest changeListNameRequest,
                                                            @PathVariable("listId") final String listId){
        // 사용자 검증
        String userId = jwtService.getUserId(request);
        EmptyResponse emptyResponse = listService.changeListName(
                userId,
                listId,
                changeListNameRequest
        );
        return new ResponseEntity<>(emptyResponse, HttpStatus.OK);
    }

    /**
     * Delete
     * [deleteToDoList]: 리스트 삭제
     * **/
    @DeleteMapping("/{listId}")
    public ResponseEntity<EmptyResponse> deleteToDoList(HttpServletRequest request,
                                               @PathVariable("listId") final String listId) throws IOException{
        String userId = jwtService.getUserId(request);
        EmptyResponse emptyResponse = listService.deleteToDoList(
                userId,
                listId
        );
        return new ResponseEntity<>(emptyResponse, HttpStatus.OK);
    }
}
