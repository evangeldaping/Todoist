import React, { useState } from 'react'
import { FaChevronDown, FaInbox, FaRegCalendarAlt, FaRegCalendar } from 'react-icons/fa'
import { AddProject } from '../AddProject';
import { Projects } from '../Projects';

export const Sidebar = () => {
    // const { selectedProject } = useSelectedProjectValue;
    const [active, setActive] = useState('inbox');
    const [showProjects, setShowProjects] = useState(true);

    return (
        <div className="sidebar" data-testid="sidebar">
            <ul className="sidebar__generic">
                <li><span><FaInbox/></span><span>Inbox</span></li>
                <li><FaRegCalendar/>Today</li>
                <li><FaRegCalendarAlt/>Next 7 days</li>
            </ul>

            <div className="sidebar__middle">
                <span><FaChevronDown/></span>
                <h2>Projects</h2>
            </div>

            <ul className="sidebar__projects">{showProjects && <Projects/>}</ul>
            {showProjects && <AddProject />}
        </div>
    )
};
