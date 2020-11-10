import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios"

const HistoryPage = () => {

  const history = useHistory()
  const [data, setData] = useState([])

  useEffect(() => {

    if (!localStorage.getItem("token")) {
      history.push('/')
    }
    else {

      const getUrl = async () => {

        const JwtToken = `JWT ${localStorage.getItem("token")}`

        const { data: { urls } } = await Axios.get("http://aa-shortener.poomrokc.services/api/user/urls", { headers: { Authorization: JwtToken } })

        setData(urls)
      }
  
      getUrl()
    }
  }, [])

  return (
    <div>
      {
        !data ? <div></div> : (
          <div className="decorate" align="center" style={{ paddingTop: 50 }}>
            <div className="Card " style={{ width: 750 }}>
            <div
              className="Card box"
              style={{ width: 600, border: "thick solid black" }}
            >
              <br />
              <div className="row">
                <div className="col-md-12 ">
                  <h2 className="card-title" style={{ fontFamily: "Courier New" }}>
                    History
                  </h2>
                </div>
                <br />
              </div>
                <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <table class="table">
                        <thead>
                          <tr>
                            <th scope="col" style={{ fontFamily: "Courier New" }}>url</th>
                            <th scope="col" style={{ fontFamily: "Courier New" }}>view</th>
                          </tr>
                        </thead>
                        <tbody>
                        {data.map(item => (
                          <tr>
                            <td style={{ fontFamily: "Courier New" }}>{item.target_url}</td>
                            <td style={{ fontFamily: "Courier New" }}>{item.visit_count}</td>
                          </tr>
                          ))}
                      </tbody>
                    </table>
                    </div>    
                </div>
                <div className="col-md-1"></div>
              <br />
            </div>
          </div>
          </div>
        )
      }
    </div>
  )
}

export default HistoryPage;