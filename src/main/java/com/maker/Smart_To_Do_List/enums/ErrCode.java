package com.maker.Smart_To_Do_List.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrCode {
    OK(""),     // ok
    AE_001("Invalid Access"), // authorization: invalid access
    AE_002("Wrong Password"), //authorization: invalid password

    JE_001("Duplicated ID"), // join: duplicated id
    JE_002("Invalid password check."), // join: invalid password. (폐기 예정)
    JE_003("Duplicated User Name"), //join: duplicated name

    LE_001("ID not found."), // login: id not found.
    LE_002("Wrong password."), // login: invalid password

    LIE_001("Duplicated List Name"), // list: duplicated name
    LIE_002("Invalid List Name"); // list: invalid list name (ex. null)

    private final String error;
}
