import { createSlice } from "@reduxjs/toolkit"

const odometryRobotSlice = createSlice({
  name: "odometryRobot",
  initialState: {
    vel_x: 0,
    yaw: 0,
    time: "",
  },
  reducers: {
    setUpdateValues(state,action) {
      state.vel_x = action.payload.vel_x;
      state.yaw = action.payload.yaw;
      state.time = action.payload.time;
    },
  },
})

export const { setUpdateValues } = odometryRobotSlice.actions;

export const addOdometryData = (rosOdometry, time) => {
  return async (dispatch) => {
    const vel_x = rosOdometry.twist.twist.linear.x
    const qua = rosOdometry.pose.pose.orientation
    const yaw = Math.atan2(2 * (qua.w * qua.z + qua.x * qua.y), 1 - 2 * (qua.y * qua.y + qua.z * qua.z)); 
    const yawDegrees = Math.round(yaw * -(180 / Math.PI));
    console.log("Angulo del robot: ",yawDegrees)

    dispatch(setUpdateValues({vel_x: vel_x, yaw: yawDegrees, time: time}))
  }
}

export default odometryRobotSlice.reducer;