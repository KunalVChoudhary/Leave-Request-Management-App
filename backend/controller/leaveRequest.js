const LeaveRequest = require("../models/leaveRequest")


//POST /api/leave
const handleUserPostLeaveRequest = async (req, res) => {
    try {

        const { startDate, endDate, reason } = req.body

        if (!startDate || !endDate) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (new Date(startDate) > new Date(endDate)) {
            return res.status(400).json({ message: "Start date cannot be after end date" })
        }

        const leave = await LeaveRequest.create({
            employee: req.user.userId,
            startDate,
            endDate,
            reason
        })

        return res.status(201).json({
            message: "Leave request submitted",
            leave
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" })
    }
}


// DELETE /api/leave/:id
const handleUserWithdrawLeaveRequest = async (req, res) => {
    try {

        console.log(req.params.id);
        const leave = await LeaveRequest.findById(req.params.id)

        if (!leave) {
            return res.status(404).json({ message: "Leave request not found" })
        }

        if (leave.employee.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Not allowed" })
        }

        if (leave.status !== "pending") {
            return res.status(400).json({ message: "Cannot withdraw processed request" })
        }

        await LeaveRequest.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            message: "Leave request withdrawn"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" })
    }
}


// GET /api/leave
const handleUserLeaveRequestList = async (req, res) => {
    try {

        const leaves = await LeaveRequest.find()
            .populate("employee", "username email")

        return res.status(200).json(leaves)

    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}

// PATCH /api/leave/:id/approve
const handleAdminApproveLeaveRequest = async (req, res) => {
    try {

        const leave = await LeaveRequest.findById(req.params.id)

        if (!leave) {
            return res.status(404).json({ message: "Leave request not found" })
        }

        leave.status = "approved"

        await leave.save()

        return res.status(200).json({
            message: "Leave approved"
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}

// PATCH /api/leave/:id/reject
const handleAdminRejectLeaveRequest = async (req, res) => {
    try {

        const leave = await LeaveRequest.findById(req.params.id)

        if (!leave) {
            return res.status(404).json({ message: "Leave request not found" })
        }

        leave.status = "rejected"

        await leave.save()

        return res.status(200).json({
            message: "Leave rejected"
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}

// GET /api/leave/my
const handleUserLeaveList = async (req, res) => {
    try {

        const leaves = await LeaveRequest.find({
            employee: req.user.userId
        }).sort({ createdAt: -1 })

        return res.status(200).json(leaves)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = {
    handleUserPostLeaveRequest,
    handleUserWithdrawLeaveRequest,
    handleUserLeaveRequestList,
    handleAdminApproveLeaveRequest,
    handleAdminRejectLeaveRequest,
    handleUserLeaveList
}
