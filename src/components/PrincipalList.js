import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ActorBtn } from './ActorBtn';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function PrincipalList({Principals, setActor, setDetails}) {

    const [rowData] = useState([]);

    Principals.map((p) => {return (
        rowData.push({Role: p.category, Name: p, Characters: p.characters })
        )
    })

    const [columnDefs] = useState([
        {
            field: "Role",
            cellStyle: {'font-weight': 'bold'}
        },
        {
            field: "Name (click to view)",
            cellRenderer: "ActorBtn",
            cellRendererParams:{
                setActor: setActor,
                setDetails: setDetails,

            },
            cellStyle: {display: 'flex', 'align-items': 'center', 'justify-content':'center'}
            
        },
        {field: "Characters"},
    ])

    // set background colour on even rows again, this looks bad, should be using CSS classes
    const getRowStyle = params => {
        if (params.node.rowIndex % 2 === 0) {
            return { background: 'lightblue'
        };
        }
    };


    

  
  return (
    <div className="ag-theme-alpine" style={{height: 400, width: 620}}>
           <AgGridReact
                frameworkComponents={{
                    ActorBtn: ActorBtn,
                }} 
                getRowStyle={getRowStyle}
                rowData={rowData}
                columnDefs={columnDefs}>
           </AgGridReact>
       </div>


  )
}

