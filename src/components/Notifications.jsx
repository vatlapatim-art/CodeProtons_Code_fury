import { useState } from 'react'
import { useFinance } from '../context/FinanceContext.jsx'

function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useFinance()
  const [expanded, setExpanded] = useState(null)

  const unreadCount =
    notifications.filter(
      (notification) => !notification.read
    ).length

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
            onClick={markAllNotificationsRead}
          >
            Mark all read
          </button>

        )}

      </div>


      <div className="notifications-card">

        {notifications.map((notification) => (

          <div
            className={
              !notification.read
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
                {notification.time || 'From your local finance data'}
              </small>

              {!notification.read && <button className="text-button" type="button" onClick={() => markNotificationRead(notification.id)}>Mark read</button>}
              <button className="text-button" type="button" onClick={() => setExpanded(expanded === notification.id ? null : notification.id)} aria-expanded={expanded === notification.id}>
                {expanded === notification.id ? 'Hide details' : 'Details'}
              </button>
              {expanded === notification.id && <small className="muted">Review this alert in your budget and goals pages.</small>}

            </div>

            {!notification.read && (
              <span className="unread-dot" />
            )}

          </div>

        ))}

      </div>

    </section>
  )
}

export default Notifications