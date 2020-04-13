import React from 'react'

const Repository = ({repository}) => {
    const {name} = repository;
    return (
        <li className="list-group-item" aria-disabled="true">
            {name}
        </li>
    );
}
 
export default Repository;