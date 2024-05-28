// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract AttendanceContract {
    address public projectManager;
    mapping(address => bool) public attendanceRecords;

    event AttendanceMarked(address indexed participant);

    constructor() {
        projectManager = msg.sender;
    }

    modifier onlyManager() {
        require(msg.sender == projectManager, "Only the project manager can perform this action");
        _;
    }

    function markAttendance() public {
        require(!attendanceRecords[msg.sender], "Attendance already marked");
        attendanceRecords[msg.sender] = true;
        emit AttendanceMarked(msg.sender);
    }

    function isParticipantPresent(address participant) public view returns (bool) {
        return attendanceRecords[participant];
    }

   
}
