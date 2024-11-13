export const getCurrentTime = () => {
  const newDate = new Date()
  const formattedDate = `${newDate.getDate().toString().padStart(2, "0")}-${(
    newDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${newDate.getFullYear()}`
  const formattedTime = `${newDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${newDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${newDate.getSeconds().toString().padStart(2, "0")}`
  const formattedDateTime = `${formattedDate} ${formattedTime}`
  return formattedDateTime
}

export const getYawDegreeFomQuaternions = (quaternion) => {
  const yaw = Math.atan2(2 * (quaternion.w * quaternion.z + quaternion.x * quaternion.y), 1 - 2 * (quaternion.y * quaternion.y + quaternion.z * quaternion.z)); 
  const yawDegrees = Math.round(yaw * -(180 / Math.PI));

  return yawDegrees
} 