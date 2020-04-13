import React, { useState, useEffect } from "react";
import RepositoriesList from '../me/Repositories';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Github = () => {

  const MySwal = withReactContent(Swal)

    const [search, setSearch] = useState({
    username : ''
    });
    const {username} = search;

    const [response, setResponse] = useState(false);
    const [results, setResults] = useState([]);

     useEffect(() => {
        readApi();
    }, [response])

    const handleChange = e => {
        setSearch({
            username,
            [e.target.name] : e.target.value
        })
    }

    const readApi = async () => {
        if(response){
            const url = `https://api.github.com/users/${username}/repos`;
            const res = await fetch(url);
            const result = await res.json();
            if(result.message === "Not Found"){
              MySwal.fire({
                onOpen: () => {
                  MySwal.clickConfirm()
                }
              }).then(() => {
                return MySwal.fire(<p>Repository not found.</p>)
              })
              setResponse(false);
              return;
            }
            setResults(result);
            setResponse(false);
        }
    }


    const handleSubmit = e => {
        e.preventDefault();
        if(username.trim()===''){
          MySwal.fire({
            onOpen: () => {
              MySwal.clickConfirm()
            }
          }).then(() => {
            return MySwal.fire(<p>Write a repository name to search...</p>)
          })
            return;
        }
        setResponse(true);
    }

  return (
    <div className="row">
    <h1 className="display-4 col-lg-12">Github Repositories</h1>
      <div className="col-lg-6">
        <form className="form-row" onSubmit={handleSubmit}>
          <div className="col-lg-12">
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
              placeholder="Github Username"
              value={username}
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-block b-grape mt-2">
            Search!
          </button>
          </div>
        </form>
      </div>
      <div className="col-lg-6">
        <ul className="list-group">
            { !response ?  <RepositoriesList repositories={results}/> 
            :
            <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            </div>
             }
        </ul>
      </div>
    </div>
  );
};

export default Github;
