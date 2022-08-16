import React from 'react';

function Records({isShowDate, records}) {
    return (
        <>

            <div className={'records-wrp'}>
                <h4>Records</h4>
                <div className={'records'}>
                    {records.map(record => (
                        <div className={'record'} key={record.id}>
                            <div className={'record__name'}>{record.name}</div>
                            <div className={'record__score'}>: {record.score}</div>
                            {isShowDate && <div className={'record__date'}>{record.date.toDate().toDateString()}</div>}
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
              .records-wrp {
                color: white;
              }

              .records {
                max-height: 270px;
                overflow: auto;
              }

              .record {
                display: flex;
                font-size: 16px;
              }

              .records .record .record__name {
                width: 170px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              .records .record .record__date {
                width: 150px;
                margin-left: auto;
                text-align: end;
              }
            `}</style>
        </>
    );
}

export default Records;
