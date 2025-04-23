import { Link } from 'react-router-dom';
import Card from '../components/shared/Card';

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>Sobre min</h1>
        <p>Um aplicativo React que cria uma análise a um produto ou serviço</p>
        <p>Versão 1.0.0</p>
        <br />
        <br />
        <br />
        <Link to="/" style={{ textDecoration: 'none' }}>
          Voltar à página inicial
        </Link>
      </div>
    </Card>
  );
}

export default AboutPage;
