import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";

interface CommentProps {
    content: string;
    // para passar função como parâmetro, devemos especificar como arrow function
    // essa está void porque ela não possui retorno. Especificar, se retornar outro tipo.
    onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {

    // sempre inicializar o stado com o mesmo tipo de informação que será armazenada nele
    // nesse caso, um inteiro, zero.
    const [likeCount, setLikeCount] = useState(0);

    function handleDeleteComment() {
       onDeleteComment(content);
    }

    /* é possível criar uma arrow function diretamente na chamada do método:
        () => setLikeCount(likeCount + 1)
        Se chamar diretamente o setLikeCount() estará fazendo a chamada da função a
        cada renderização. A renderização altera o estado, o estado força a renderização
        e entra em loop.
     */

    /*
    quando for atualizar uma informação e essa informação depender do valor anterior,
    deve-se usar uma função para fazê-lo.
    
    // para atualizar "likes", preciso do valor anterior de "likes", então, uso uma função
    // para poder incrementá-lo
    function handleLikeComment() {
        setLikeCount((myNewVariable) => {
            return myNewVariable + 1
        })
    }
    */
    // esse método também funciona
    // function handleLikeComment() {
    //     setLikeCount(likeCount + 1);
    // }
    function handleLikeComment() {
        setLikeCount((stateOfLike) => {
            return stateOfLike + 1
        })
    }

    return (
        <div className={styles.comment}>
            <Avatar
                hasBorder={false}
                src="https://github.com/vieiraanap.png"
                
            />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.author}>
                            <strong>Manoel Lima</strong>
                            <time title="20 de março às 00:27h" dateTime="2023-03-20 00:27:00">Cerca 1h atrás</time>
                        </div>

                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash size={24} />
                        </button>
                    </header>
                    <p>{content}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
            
        </div>
    );
}