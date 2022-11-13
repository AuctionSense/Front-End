import styles from "../css/App.module.css";

function ErrorMessage( { error }: {error: Error}) {
    return (
        <div
        className={styles.errorBox}
        style={error ? { display: "block" } : { display: "none" }}
      >
        <h3>Error: {error.message}</h3>
      </div>
    );
}

export default ErrorMessage;
