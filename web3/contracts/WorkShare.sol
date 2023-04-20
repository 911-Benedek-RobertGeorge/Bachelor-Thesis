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


///TODO 
    // - add a tax for each project, 3%  (add somebody who can withdraw it from the contract
    // - add a new nft to the address somebody has , maybe a mapping address - > string , where the string is the nft metadata or the nft from pinata
    // maybe add a recursive payment ( transferng tokens in ethereum) 

    enum State{ OPEN, INPROGRESS, COMPLETED, FAILED}
      //must delete a project after finalize / not commpleted, or to make a variable there
    //finalize function works even if we dont have an developer 
  
    struct Project{
        address manager; //TODO MAYBE CHANGE THIS TO PAYABLE
        string shortDescription;
        State state; 
        string requirementsDocumentCID; // IPFS pinata CID
        uint64 reward; // the number of workShareTokens for completing the task
        uint64 penalty; // applied if after deadline
        uint64 deadline; //unix epoch , curently using only 31 bits, but this way we are future safe
        uint32 nrOfApplicants;
        mapping(uint32 => address) applications; // all the addresses that want this project
        address payable acceptedDeveloper; 
    }

    function getAllApplicants(uint32 projectNumber) public view onlyAdmin returns (address[] memory){
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
    function acceptApplication(uint32 _nrOfProject, address _applicant) public onlyAdmin {
        //require(projects[_nrOfProject].applications[_applicant], "The address has not applied for this project.");
        require(msg.sender == projects[_nrOfProject].manager,"You can only accept applicants for your own project.");
        projects[_nrOfProject].acceptedDeveloper = payable(_applicant);
        projects[_nrOfProject].state = State.INPROGRESS;
    }

    //Allow developers to apply for a project
    function applyForProject(uint32 _projectNumber) public {
        require(projects[_projectNumber].state == State.OPEN, "You can only apply to open projects.");
        string memory email = developers[msg.sender];
        require(bytes(email).length != 0, "You have to be registered first");
        uint32 nrOfApplicants = projects[_projectNumber].nrOfApplicants ++; 
        projects[_projectNumber].applications[nrOfApplicants] = msg.sender;  ///indexed from 0 
    }

    //When the project is approved by the manager, giving the reward to the developer
    function finalizeProject(uint32 _projectNumber) public onlyAdmin{
        
        Project storage project = projects[_projectNumber]; // get a refference to the project
        require(project.state == State.INPROGRESS, "The project must be in progress to be finalized.");
        require(msg.sender == project.manager,"You can only finalize your own projects.");
        uint finalReward = project.reward;
        if(project.deadline < block.timestamp)
        {
            finalReward -= project.penalty;
            // send back the penalty tokens to the project manager
            require(workShareToken.transfer(msg.sender,project.penalty),"The transfer of penalty tokens failed."); 
        }
        require(workShareToken.transfer(project.acceptedDeveloper, finalReward),"The transfer of the reward failed");
        project.state = State.COMPLETED;
    }

    //When a project has not been completed, if the manager agrees that the developer has been implicated he will get 20% of reward, 
    // otherwise the developer does not get anything
    function projectNotCompleted(uint32 _projectNumber, bool _effort) public onlyAdmin{
        Project storage project = projects[_projectNumber]; // get a refference to the project 
        require(project.state == State.OPEN ||
                project.state == State.INPROGRESS,
                "This project is not in progres nor open");
        require(msg.sender == project.manager,"You can only finalize your own projects.");
        require(project.deadline < block.timestamp , "The deadline has not passed. Give it some time.");
        uint finalReward = 0;
        if(_effort == true)
        {
            // the developer will only get 20% reward for the effort
            finalReward = uint(project.reward / 5);
            require(workShareToken.transfer(project.acceptedDeveloper, finalReward),"The transfer of the reward failed");
        }
         // send back the tokens to the project manager
        require(workShareToken.transfer(msg.sender,project.reward - finalReward),"Transfering back the tokens of the not completed project failed.");
        project.state = State.FAILED;
    }

    function initialize(address payable _token) public initializer onlyOwner{
        workShareToken = WorkShareToken(_token);
        admins[msg.sender] = true;
    }
    
    //Create a project 
    event CreateProjectEvent(uint32 nrOfProjects,string _requirementsDocumentCID,uint64 _reward, uint64 _penalty, uint64 _deadline);
    function createProject(string memory _shortDescription,string memory _requirementsDocumentCID,uint64 _reward, uint64 _penalty, uint64 _deadline) public onlyAdmin
    {
        //give allowance to the smart contract to transfer tokens to its address
        //require(workShareToken.approve(address(this), _reward),"Approving contract to spend the reward tokens has failed");
        
         ///transfer the tokens to the smart contract
        require(workShareToken.transferFrom(msg.sender, address(this), _reward),"The transfer of reward to the contract has failed");
        
        Project storage newProject = projects[nrOfProjects];
        ++nrOfProjects; // ++i cost less gas than i++

        
        newProject.manager = msg.sender;
        newProject.shortDescription = _shortDescription;
        newProject.state = State.OPEN;
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


    //The developers are going to register with the address and email.
    function register(string memory _email) public { 
        require(bytes(_email).length == 0, "You are already registered");
        developers[msg.sender] = _email;
        ++nrOfDevelopers;
    }

    function changeManagerOfProject(uint32 _projectNumber, address _newManager) public onlyOwner {
        require(admins[_newManager], "The address must have an admin role first.");  
        projects[_projectNumber].manager = _newManager;
    }

    //GETTERS
    // function getAllProjects() public view returns(Project[] memory){
    //     Project[] memory projectList = new Project[](nrOfProjects); 
    //     for(uint32 i = 0; i < nrOfProjects; ++i){
    //         projectList[i] = projects[i];
    //     }
    //     return projectList;
    // }

    // function getOpenProjects() public view returns(Project[] memory){
    //      Project[] memory projectList = new Project[](nrOfProjects); 
    //     for(uint32 i = 0; i < nrOfProjects; ++i){
    //         if(projects[i].state == State.OPEN)
    //             {
    //                 projectList[i] = projects[i];
    //             }
    //     }
    //     return projectList;
    // }

    function getEmailOfDeveloper(address _address) public view onlyAdmin returns(string memory) {
        return developers[_address];
    }
    
} 