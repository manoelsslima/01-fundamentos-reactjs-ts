import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface PostProps {
    post: PostType;
}

/**
 * é possível desestruturar props para pegar só os valores direto e tirar o "props." e usar
 * diretamente "author."
 * Ex.: export function Post({ author })
 * <strong>{author.name}</strong>
 * 
 * Foi instalada a biblioteca date-fns. (npm i date-fns)
 */
export function Post({ post }: PostProps) {

    /**
    * Estado = variáveis que desejamos que o componente monitore (as mudanças delas)
    * const comments = useState([1,2]);
    * useState retorna array com 2 posições. Usamos desestruturação.
    * a primeira posição é a variável que será modificada. a segunda posição é a
    * função que irá alterar o valor da variável. A função avisa ao react que houve
    * uma mudança. Passamos o novo valor para a variável comments (imutabilidade).
    */
    const [comments, setComments] = useState([
      'Post muito bacana, hein?!'
    ])

    // importante inicializar o estado com o mesmo tipo de dado.
    // textarea é texto, então inicializa com texto vazio ''
    const [newCommentText, setNewCommentText] = useState('')

    // quando um evento é disparado por um elemento html e não pelo form
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {

        // retornando o estado da validação ao inicial. Caso contrário, após exibir a
        // mensagem de campo obrigatório, não é possível enviar um novo comentário.
        event.target.setCustomValidity('');

        // target é quem disparou o evento, no caso, o onChange do textarea
        //console.log(event.target.value);
        setNewCommentText(event.target.value);
    }

    // quando um evento é disparado por um elemento html e não pelo form
    function handleInvalidNewComment(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Este campo é obrigatório.');
    }

    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBr
    });

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBr,
        addSuffix: true
    })

    // const publishedDateFormatted = new Intl.DateTimeFormat('pt-BR', {
    //     day: '2-digit',
    //     month: 'long',
    //     hour: '2-digit',
    //     minute: '2-digit'
    // }).format(props.publishedAt);
    
    // quando um evento é disparado pelo form, especificar o event FormEvent
    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        // ... spread operator -> copia o valor da variável para um novo array
        //setComments([...comments, comments.length + 1]);
        // agora, o newCommentText está com o valor armazenado pelo estado criado newCommentText
        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    // o componente que tem o estado (useState) é quem deve enviar as funções para
    // os componentes filhos poderem se comunicar com ele
    function deleteComment(commentToDelete: string) {
        //console.log(`Deletar comentário ${comment}`);

        // imutabilidade -> não podemos mudar a lista. Então, criamos uma nova sem o valor
        // que queremos remover
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment != commentToDelete;
        })
        // atualiza a lista sem o comentário deletado. Não existe remoção por conta da
        // imutabilidade
        setComments(commentsWithoutDeletedOne);
    }

    // clean code
    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder={true} src={post.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time
                    title={publishedDateFormatted}
                    dateTime={post.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {post.content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type ==='link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <textarea
                    name="comment"
                    value={newCommentText}
                    placeholder="Deixe um comentário"
                    onChange={handleNewCommentChange}
                    onInvalid={handleInvalidNewComment}
                    required
                />
                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    // passando uma função para o comentário (para que o comentário possa chamá-la
                    // e excluir o comentário de um componente pai). O nome da propriedade é livre
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}