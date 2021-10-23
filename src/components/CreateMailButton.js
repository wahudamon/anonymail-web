import React from 'react'
import { Link } from 'react-router-dom'

export default function CreateMailButton() {
  return (
    <div className="text-center mb-3">
      <Link to="/create-mail" className="btn" style={{background: '#8e94f2', color: '#FFF', borderRadius: '10px', fontWeight: 'bold'}}>Send New Mail!</Link>
    </div>
  )
}
