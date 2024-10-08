export const URL_ROS_DEFAULT = "ws://localhost:9090"
export const ROSLOG_TOPIC = "/rosout"
export const ODOM_TOPIC = "/puma/odometry/filtered"
export const REALSENSE_TOPIC = "/puma/camera/color/image_raw/compressed"
export const GPS_TOPIC = "/puma/sensors/gps/fix"
export const ACCELERATOR_TOPIC = "/puma/accelerator/command"
export const DIRECTION_TOPIC = "/puma/direction/command"
export const REVERSE_TOPIC = "/puma/reverse/command"
export const BRAKE_TOPIC = "/puma/brake/command"
export const MODE_SELECTOR_TOPIC = "/puma/mode_selector"

export const WAYPOINTS_SEND_TOPIC = "/puma/waypoints/planned_goal_gps"
export const WAYPOINTS_START_TOPIC = "/puma/waypoints/plan_ready"
export const WAYPOINTS_STOP_TOPIC = "/puma/waypoints/plan_stop"

export const LIMIT_ANGLE = 30
export const LIMIT_ACCEL = 50
export const INITIAL_ACCEL = 22
export const DEG2RAD = 0.0174533
