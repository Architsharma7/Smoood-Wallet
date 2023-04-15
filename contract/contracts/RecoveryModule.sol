// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.0 <0.9.0;

/// execWill start for swapping the owner
interface GnosisSafe {
    enum Operation {
        Call,
        DelegateCall
    }

    /// @dev Allows a Module to execute a Safe transaction without any further confirmations.
    /// @param to Destination address of module transaction.
    /// @param value Ether value of module transaction.
    /// @param data Data payload of module transaction.
    /// @param operation Operation type of module transaction.
    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes calldata data,
        Operation operation
    ) external returns (bool success);
}

contract RecoveryModule {
    address public recoveryManager;

    struct RecoveryRecord {
        string q1;
        string a1;
        string q2;
        string a2;
        address eoa;
    }

    constructor(address _recoveryManager) {
        recoveryManager = _recoveryManager;
    }

    mapping(address => RecoveryRecord) public records;

    modifier onlyRecoveryManager() {
        require(msg.sender == recoveryManager, "Authorised Personnel Only");
        _;
    }

    // restrice the manager
    function setRecoveryRecords(
        address safeAddress,
        address eoa,
        string memory q1,
        string memory a1,
        string memory q2,
        string memory a2
    ) public onlyRecoveryManager {
        /// safeAddress owner can just set the Recovery Methods

        records[safeAddress] = RecoveryRecord(q1, a1, q2, a2, eoa);

        // new records are now added
    }

    function recoverWallet(
        address safeAddress,
        address newOwnerWallet
    ) public onlyRecoveryManager {
        RecoveryRecord memory _record = records[safeAddress];

        bytes memory data = abi.encodeWithSignature(
            "swapOwner(address prevOwner, address oldOwner, address newOwner)",
            address(0x1),
            _record.eoa,
            newOwnerWallet
        );

        GnosisSafe(safeAddress).execTransactionFromModule(
            safeAddress,
            0,
            data,
            GnosisSafe.Operation.Call
        );
    }

    function getRecoveryRecord(
        address safeAddress
    ) public view onlyRecoveryManager returns (RecoveryRecord memory _record) {
        _record = records[safeAddress];
    }
}
