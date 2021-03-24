import React from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends React.Component {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link to={'/'} className={'navbar-braind'}>Streamit</Link>
                    <button className="navbar-toggler" type="button" 
                        data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collpase navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item float-right">
                                <Link className={'nav-link'} to={'/settings'}>
                                    Go live!
                                </Link>
                            </li>
                            <li className="nav-item float-right">
                                <a href="https://github.com/rivvarivvs" className="nav-link" target='_blank'>Github</a>
                            </li>
                            <li className="nav-item float-right">
                                <a href="/Logout" className="nav-link">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}