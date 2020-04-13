import React from 'react'
import Repository from './Repository';

const RepositoriesList = ({repositories}) => {
    return (
        <div className="repositories">
            {repositories.map((repository) => (
                <Repository key={repository.id} repository={repository}/>
            ))} 
        </div>
    );
}
 
export default RepositoriesList;