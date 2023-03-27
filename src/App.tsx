import { Header } from './components/Header';
import { Post } from './components/Post';
import { Sidebar } from './components/Sidebar';

import './global.css';
import styles from './App.module.css';

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/manoelsslima.png",
      name: "Manoel Lima",
      role: "CTO @Vortrix"
    },
    content: [
      { type: 'paragraph', content: 'Fala galera!' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto pro meu porfólio' },
      { type: 'link', content: 'github.com/manoelsslima' },
    ],
    publishedAt: new Date('2023-03-23 00:30:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/diego3g.png",
      name: "Diego Fernandes",
      role: "CTO @Rocketseat"
    },
    content: [
      { type: 'paragraph', content: 'Fala galera!' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto pro meu porfólio' },
      { type: 'link', content: 'github.com/manoelsslima' },
    ],
    publishedAt: new Date('2023-03-22 23:50:00'),
  },
];

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          { posts.map(post => {
            /* quando o return tem mais de 1 linha, colocar entre parênteses */
            /* todo elemento iterable deve ter um atributo key único */
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          }) }
        </main>
      </div>
    </div>
  )
}

// export default App