import style from "./ListTitle.module.css";

interface ListTitleProps {
    children: React.ReactNode;
}

const ListTitle = ({children}: ListTitleProps) => {
    return <h2 className={style.title}>{children}</h2>
}

export default ListTitle;