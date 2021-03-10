import React, { useState } from 'react';

const Schedule = ({ name, src }) => {
  return (
    <>
      <div>
        <iframe width="280" height="157.5" src={`https://docs.google.com/viewer?srcid=${src}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`} ></iframe>
        <h3>{name}</h3>
      </div>
    </>
  );
}

export default Schedule;