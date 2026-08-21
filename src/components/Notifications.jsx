import { useState } from 'react'

function Notifications() {

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: '⚠️',
      title: 'Shopping budget exceeded',
      message: 'You are ₹1,800 above your shopping budget.',
      time: '10 min ago',
      unread: true,
    },
    {
      id: 2,
      icon: '🎯',
      title: 'Home goal update',
      message: 'Your goal is now 62% funded.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 3,
      icon: '📈',
      title: 'Portfolio update',
      message: 'Your portfolio gained 1.8% this month.',
      time: 'Yesterday',
      unread: false,
    },
  ])

  const unreadCount =
    notifications.filter(
      (notification) => notification.unread
    ).length

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    )
  }

  return (
    <section className="section" id="notifications">

      <div className="section-heading">

        <div>
          <p className="eyebrow">
            17 / stay informed
          </p>

          <h2>
            Notifications
          </h2>
        </div>

        {unreadCount > 0 && (

          <button
            className="outline-button"
            onClick={markAllRead}
          >
            Mark all read
          </button>

        )}

      </div>


      <div className="notifications-card">

        {notifications.map((notification) => (

          <div
            className={
              notification.unread
                ? 'notification unread'
                : 'notification'
            }
            key={notification.id}
          >

            <div className="notification-icon">
              {notification.icon}
            </div>

            <div className="notification-content">

              <strong>
                {notification.title}
              </strong>

              <p>
                {notification.message}
              </p>

              <small>
                {notification.time}
              </small>

            </div>

            {notification.unread && (
              <span className="unread-dot" />
            )}

          </div>

        ))}

      </div>

    </section>
  )
}

export default Notifications