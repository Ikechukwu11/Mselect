import React, { useState, useEffect, useRef } from 'react';

const UserContextMenu = ({ type, item, menuItems, functions }) => {
  const [isContextMenuOpen, setContextMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);

  const toggleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuOpen(!isContextMenuOpen);
    setMenuPosition({ top: e.clientY, left: e.clientX });
  };

  const closeContextMenu = () => {
    setContextMenuOpen(false);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeContextMenu();
      }
    };

    if (isContextMenuOpen) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isContextMenuOpen]);

  return (
    <div className="menu-actions" ref={menuRef}>
      <span onClick={toggleContextMenu}>⋮</span>
      {isContextMenuOpen && (
        <div
          className="context-menu"
          style={{ top: menuPosition.top, left: menuPosition.left+10 }}
        >
          <ul>
            {menuItems.map((menuItem, index) => (
              <li key={index} onClick={() => {functions[index](item.id);  setContextMenuOpen(false);}}>
                {menuItem}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserContextMenu;
