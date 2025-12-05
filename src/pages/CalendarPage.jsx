import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './CalendarPage.css';

const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Team Meeting',
      start: '2025-12-05T10:00:00',
      end: '2025-12-05T11:00:00',
      backgroundColor: '#6366f1',
      borderColor: '#6366f1',
    },
    {
      id: '2',
      title: 'Delivery Schedule',
      start: '2025-12-06T14:00:00',
      end: '2025-12-06T16:00:00',
      backgroundColor: '#8b5cf6',
      borderColor: '#8b5cf6',
    },
    {
      id: '3',
      title: 'Client Presentation',
      start: '2025-12-08T09:00:00',
      end: '2025-12-08T10:30:00',
      backgroundColor: '#00b4d8',
      borderColor: '#00b4d8',
    },
    {
      id: '4',
      title: 'Route Planning',
      start: '2025-12-10T13:00:00',
      end: '2025-12-10T15:00:00',
      backgroundColor: '#00ff41',
      borderColor: '#00ff41',
    },
    {
      id: '5',
      title: 'Project Review',
      start: '2025-12-12',
      allDay: true,
      backgroundColor: '#f59e0b',
      borderColor: '#f59e0b',
    },
  ]);

  const handleDateClick = (arg) => {
    const title = prompt('Enter Event Title:');
    if (title) {
      const newEvent = {
        id: String(events.length + 1),
        title: title,
        start: arg.dateStr,
        allDay: arg.allDay,
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
      setEvents(events.filter(event => event.id !== clickInfo.event.id));
    }
  };

  const handleEventDrop = (dropInfo) => {
    const updatedEvents = events.map(event => {
      if (event.id === dropInfo.event.id) {
        return {
          ...event,
          start: dropInfo.event.start.toISOString(),
          end: dropInfo.event.end ? dropInfo.event.end.toISOString() : null,
        };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h1>Calendar</h1>
        <p>Manage your schedule and events</p>
      </div>

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          height="auto"
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false
          }}
        />
      </div>

      <div className="calendar-info">
        <div className="info-card">
          <h3>How to use:</h3>
          <ul>
            <li>📅 Click on any date to add a new event</li>
            <li>🖱️ Click on an event to delete it</li>
            <li>✋ Drag and drop events to reschedule</li>
            <li>📊 Switch between Month, Week, and Day views</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
