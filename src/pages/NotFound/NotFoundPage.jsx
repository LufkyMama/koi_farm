import React from 'react'
import Card from './NotFoundCard';

function NotFoundPage() {
  return (
    <div className="text-center">
      <Card />
      <button
        onClick={() => window.location.href = '/'}
        style={{ marginTop: '2em', padding: '1em 2em', fontSize: '1em', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: '#ff5722', color: 'white' }}
      >
        Go Back Home
      </button>
    </div>
  )
}
export default NotFoundPage