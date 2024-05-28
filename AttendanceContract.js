const AttendanceContract = artifacts.require("AttendanceContract");

contract("AttendanceContract", (accounts) => {
  let attendanceContractInstance;

  before(async () => {
    attendanceContractInstance = await AttendanceContract.deployed();
  });

  it("should mark attendance correctly", async () => {
    const participant = accounts[1];
    await attendanceContractInstance.markAttendance({ from: participant });
    const isPresent = await attendanceContractInstance.isParticipantPresent(participant);
    assert.equal(isPresent, true, "Participant's attendance not marked correctly");
  });

  it("should not mark attendance again for the same participant", async () => {
    const participant = accounts[2];
    await attendanceContractInstance.markAttendance({ from: participant });
    try {
      await attendanceContractInstance.markAttendance({ from: participant });
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert(error.message.includes("Attendance already marked"), "Unexpected error message");
    }
  });

  it("should terminate the contract by the project manager", async () => {
    const projectManager = accounts[0];
    // Capture the contract address before termination
    const contractAddress = attendanceContractInstance.address;
    
    await attendanceContractInstance.terminateContract({ from: projectManager });

    // Verify the contract code at the address is removed (returns '0x' or empty)
    const code = await web3.eth.getCode(contractAddress);
    assert(code === '0x' || code === '', "Contract code still exists after termination");
  });
});
