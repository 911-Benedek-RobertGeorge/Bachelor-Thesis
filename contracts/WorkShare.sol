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
        mapping(uint32 => address) applications; // all the addresses that want this project
        address payable acceptedDeveloper; 
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
        return tempEmptyStringTest.length;
    }
    
    //should  the person to apply necceserily or the admin can name it even if not from applications ? 
    function acceptApplication(uint32 _nrOfProject, address _applicant) public {
        require(msg.sender == projects[_nrOfProject].manager,"You can only accept applicants for your own project.");
        projects[_nrOfProject].acceptedDeveloper = payable(_applicant);
    }

    function applyForProject(uint32 _projectNumber) public {
        string memory email = developers[msg.sender];
        require( bytes(email).length == 0, "You have to be registered first");
        uint32 nrOfApplicants = projects[_projectNumber].nrOfApplicants ++; 
        projects[_projectNumber].applications[nrOfApplicants] = msg.sender;
    }

    function finalizeProject(uint32 _projectNumber) public { //onlyAdmin{   the manager is for sure an admin so ne need to verify this
        require(msg.sender == projects[_projectNumber].manager,"You can only finalize your own project.");

        Project storage project = projects[_projectNumber]; // get a refference to the project
        uint finalReward = project.reward;
        if(project.deadline > block.timestamp)
        {
            finalReward -= project.penalty;
            require(workShareToken.transfer(msg.sender,project.penalty),"The transfer of penalty tokens failed."); // send back the penalty tokens to the project manager
        }
        require(workShareToken.transfer(project.acceptedDeveloper, finalReward),"The transfer of the reward failed");
         
    }

    function initialize(address payable _token) public initializer{
        workShareToken = WorkShareToken(_token);
        admins[msg.sender] = true;
    }
    
    event CreateProjectEvent(uint32 nrOfProjects,string _requirementsDocumentCID,uint64 _reward, uint64 _penalty, uint64 _deadline);
    function createProject(string memory _requirementsDocumentCID,uint64 _reward, uint64 _penalty, uint64 _deadline) public onlyAdmin
    {
        //give allowance to the smart contract to transfer tokens to its address
        require(workShareToken.approve(address(this), _reward),"Approving contract to spend the reward tokens has failed");
        
         ///transfer the tokens to the smart contract
        require(workShareToken.transferFrom(msg.sender, address(this), _reward),"The transfer of reward to the contract has failed");
        
        Project storage newProject = projects[nrOfProjects];
        ++nrOfProjects; // ++i cost less gas than i++

        newProject.manager = msg.sender;
        newProject.requirementsDocumentCID = _requirementsDocumentCID;
        newProject.reward = _reward;
        newProject.penalty = _penalty;
        newProject.deadline = _deadline;
        newProject.nrOfApplicants = 0;
 
        emit CreateProjectEvent(nrOfProjects-1, _requirementsDocumentCID,  _reward, _penalty, _deadline);

    }

    function grantAdminRole(address _admin) public onlyOwner{
        admins[_admin] = true;
    }

    function revokeAdminRole(address _remove) public onlyOwner{
        admins[_remove] = false;
    }
    
} 