import React from 'react'
import CategoryDetail from '../../components/CategoryDetail'
import { useParams } from 'react-router-dom'

const CategoryById = () => {
    const { id } = useParams();

  return (
    <div className='mt-20'>
        <CategoryDetail id={id}/>
    </div>
  )
}

export default CategoryById