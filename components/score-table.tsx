import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid, } from '@material-ui/data-grid';

import { getScores, scoreState } from '../lib/slices/scoreSlice'

const columns = [
    { field: 'fullName', headerName: 'Full Name', width: 130 },
    {
        field: 'score',
        headerName: 'Score',
        type: 'string',
        width: 90,
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        width: 160,
    }
];

export default function CustomizedSnackbars() {
    const dispatch = useDispatch()
    const { scoreTable } = useSelector(scoreState)
    useEffect(() => {
        dispatch(getScores())
    }, [])
    const rows = scoreTable
    return (
        <div>
            scores
            {scoreTable && rows.length !== 0 && <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
            </div>
            }
             {!scoreTable || rows.length === 0 && <div style={{ height: 400, width: '100%' }}>
                <h1>No Score Yet...</h1>
            </div>
            }
        </div>
    );
}