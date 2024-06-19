import React from 'react'
import { useParams } from 'react-router-dom'
import { useData } from '../utils/DataContext';
import { getCategoryName } from '../utils/services';
import PostList from '../components/PostList';

const CategoryPosts = () => {
  const { id: categoryId } = useParams();
  const { posts, categories } = useData();
  const categoryPosts = posts?.length ? posts.filter(i => i?.category === categoryId) : [];

  return (
    <div className="p-4">
			<h1 className="text-2xl font-bold leading-8 tracking-widest mb-4">
				{getCategoryName(categories, categoryId)}
			</h1>

			<PostList posts={categoryPosts} />
		</div>
  )
}

export default CategoryPosts