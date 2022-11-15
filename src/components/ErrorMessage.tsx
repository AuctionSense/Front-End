import styles from "../css/App.module.css";

function ErrorMessage( { errors }: {errors: Error[]}) {
    return (
        <div
        className={styles.errorBox}
        style={errors ? { display: "block" } : { display: "none" }}
      >
        {errors.map((error) => {
            return (
            <div key={error.name}>
                {error.message}
            </div>
            );
        })}
      </div>
    );
}

export default ErrorMessage;
