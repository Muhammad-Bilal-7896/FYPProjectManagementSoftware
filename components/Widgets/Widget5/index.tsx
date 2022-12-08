import styles from './widget5.module.css';

interface IProps {
    item: Number,
    currentFullLengthItem: Number,
    setCurrentFullLengthItem: Function
}

const Widget5: React.FC<IProps> = ({
    item,
    currentFullLengthItem,
    setCurrentFullLengthItem
}) => {
    return(
        <div className={styles.container}>
            <h1>My Goals</h1>
        </div>
    )
}
export default Widget5;