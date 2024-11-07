const updateWaypoints = () => {
  if (arrayPosition.selectedPosition.length > 0 && rosIsConnected) {
    const path = arrayPosition.selectedPosition.map((latlon) => ({
      latitude: latlon[0],
      longitude: latlon[1],
    }))
    rosInstance.sendMessage(
      WAYPOINTS_SEND_TOPIC,
      "puma_waypoints_msgs/GoalGpsArray",
      { data: path }
    )
    console.log(path)
    dispatch(successNotification("Los destinos han sido enviados al robot"))
    setReadyPath(true)
  }
}

const startNavPath = () => {
  if (readyPath) {
    rosInstance.sendMessage(WAYPOINTS_START_TOPIC, "std_msgs/Empty", {})
    dispatch(successNotification("Se ha enviado la señal de inicio al robot"))
  }
}

const stopNavPath = () => {
  rosInstance.sendMessage(WAYPOINTS_STOP_TOPIC, "std_msgs/Empty", {})
  dispatch(
    successNotification("Se ha enviado la señal de detención al robot")
  )
  setReadyPath(false)
}