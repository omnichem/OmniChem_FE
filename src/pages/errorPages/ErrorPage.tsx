interface ErrorPageProps {
  errorCode?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <img
        src="https://www.google.com/images/errors/robot.png"
        alt="Error Robot"
        style={{ width: '150px', marginBottom: '20px' }}
      />
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Упс! Что-то пошло не так.</h1>
      <p style={{ fontSize: '16px', color: '#666' }}>
        Пожалуйста, попробуйте обновить страницу или обратитесь в службу поддержки.
      </p>
      <div
        style={{
          marginTop: '20px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <h2 style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>Дополнительная информация:</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {/* <li style={{ fontSize: '16px', color: '#666' }}>Код ошибки: {errorCode}</li> */}
          <li style={{ fontSize: '16px', color: '#666' }}>Отметка времени: {new Date().toLocaleString()}</li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorPage;
