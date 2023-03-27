import { ImgHTMLAttributes } from "react";
import styles from "./Avatar.module.css";

/**
 * Como a interface estende ImgHTMLAttributes, o AvatarProps recebe
 * todas as propriedades que uma tag img do HTML pode ter. Evitamos
 * ter que colocar todas as tags: src, alt, etc.
 */
interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    // a ? após o nome da variável a torna opcional
    hasBorder?: boolean;
//    src: string;
//    alt?: string;
}

// extraio a propriedade hasBorder e uso o spread operator ... para pegar
// o restante das propriedades
export function Avatar({ hasBorder, ...props }: AvatarProps) {
    /**
     * é possível usar desestruturação para pegar os atributos
     * 
     * export function Avatar({ hasBorder=true, src })
     * 
     * Assim, nas propriedades, pode omitir o props. e o hasBorder default será true.
     */
    return (
        <img
            className={hasBorder ? styles.avatarWithBorder : styles.avatar}
            // passo cada valor dentro de props e passando como uma propriedade para a tag img
            {...props}
        />
    );
}