//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 < 0.9.0; /// greater than 0.8.0 to avoid overflows
import './WorkShareToken.sol';
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; 

contract WorkShare is Initializable, Ownable{ 

    // ERC20 token used for rewarding developers
    IERC20 public workShareToken;
    
    //MAYBE ADD THE NFT AND THE ADMINS CAN MINT A NFT AND GIVE IT TO THE PERSON WHO COMPLETED THE PROJECT
    
    // Total number of developers
    uint32 public nrOfDevelopers;

    // Total number of projects
    uint32 nrOfProjects;

    // mapping for registered developers, address to email, 
    //the users emails are safe because there is no way to iterate through a mapping
    mapping (address => string) private developers;   // private or public? 
    
    // the managers, Users that can create contracts
    mapping (address => bool) admins;
    
    // index to project mapping 
    mapping (uint32 => Project) public projects; 

    modifier onlyAdmin(){
        require(admins[msg.sender] == true, "Only admins are allowed to do this!");
        _;
    }

    struct Project{
        address manager;
        string shortDescription;
        string requirementsDocumentCID; // IPFS pinata CID
        uint64 reward; // the number of workShareTokens for completing the task
        uint64 penalty; // applied if after deadline
        uint64 deadline; //unix epoch , curently using only 31 bits, but this way we are future safe
        uint32 nrOfApplicants;
        mapping(uint32 => address) applications; // when an admin approves they are added in developers
        mapping(address => bool) acceptedDeveloper; 
    }

    function getAllApplicants(uint32 projectNumber) public view returns (address[] memory){
        uint32 nrOfApplicants = projects[projectNumber].nrOfApplicants;
        address[] memory applicants = new address[](nrOfApplicants);
        for (uint32 i = 0; i < nrOfApplicants; ++i) { // ++i for less gas consumption (5 gas per iteration )
            applicants[i] = projects[projectNumber].applications[i];
        }
        return applicants;
    }
    function getStringLenght(string memory str) public pure returns(uint256) {
        bytes memory tempEmptyStringTest = bytes(str); // Uses memory
        if (tempEmptyStringTest.length == 0) {
            // emptyStringTest is an empty string
        } else {
            // emptyStringTest is not an empty string
        }
        return tempEmptyStringTest.length;
    }
    
    //should  the person to apply necceserily or the admin can name it even if not from applications ? 
    function acceptApplication(uint32 _nrOfProject, address _applicant) public onlyAdmin{
        require(msg.sender == projects[_nrOfProject].manager,"You can only accept applicants for your project.");
        projects[_nrOfProject].acceptedDeveloper[_applicant] = true;
    }
    function applyForProject(uint32 _nrOfProject) public {
        string memory email = developers[msg.sender];
        require( bytes(email).length == 0, "You have to be registered first");
        uint32 nrOfApplicants = projects[_nrOfProject].nrOfApplicants ++; 
        projects[_nrOfProject].applications[nrOfApplicants] = msg.sender;
    }
    function initialize(address payable _token) public initializer{
        workShareToken = WorkShareToken(_token);
        admins[msg.sender] = true;
    }
    
    event CreateProjectEvent(string _requirementsDocumentCID,uint64 _reward, uint64 _penalty, uint64 _deadline);
    function createProject(string memory _requirementsDocumentCID,uint64 _reward, uint64 _penalty, uint64 _deadline) public 
    {
        Project storage newProject = projects[nrOfProjects];
        nrOfProjects += 1;
        newProject.requirementsDocumentCID = _requirementsDocumentCID;
        newProject.reward = _reward;
        newProject.penalty = _penalty;
        newProject.deadline = _deadline;
        newProject.nrOfApplicants = 0;
        
        emit CreateProjectEvent(_requirementsDocumentCID,  _reward, _penalty, _deadline);

    }

    function grantAdminRole(address _admin) public onlyOwner{
        admins[_admin] = true;
    }

    function revokeAdminRole(address _remove) public onlyOwner{
        admins[_remove] = false;
    }
    
} 