import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import MainNewsCard from '../components/MainNewsCard';
import App from '../App';
import fetchMock from './mocks/fetchMock';
import { renderWithRouter } from '../utils/renderWithRouter';
import NewsProvider from '../context/NewsProvider';

describe('MainNewsCard', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock as any);
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('renderiza o título corretamente', async () => {
    renderWithRouter(
      <NewsProvider>
        <App />
      </NewsProvider>,
    );
    expect(await screen.findByText(/Leia a notícia aqui/i)).toBeInTheDocument();
    expect(await screen.findByText(/Data de publicação/i)).toBeInTheDocument();

    expect(await screen.findByText(/IBGE realiza cerimônia de entrega do 1º Prêmio Fotográfico do Censo Demográfico 2022/i)).toBeInTheDocument();
    expect(await screen.findByText(/Ganhadores do Prêmio Fotográfico se reúnem no palco do auditório ao final do evento/i)).toBeInTheDocument();
    expect(await screen.findByText(/19\/10\/2023/i)).toBeInTheDocument();
  });
  it('exibe o ícone de coração cheio quando o item está nos favoritos', () => {
    const fakeFavorites = {
      38145: {
        titulo: 'IBGE realiza cerimônia de entrega do 1º Prêmio Fotográfico do Censo Demográfico 2022',
        introducao: 'Ganhadores do Prêmio Fotográfico se reúnem no palco do auditório ao final do evento - Foto: Victor Otsuka/IBGE A cerimônia de entrega do 1º Prêmio Fotográfico do Censo Demográfico 2022 foi realizada, no dia 16 de outubro, na Assembleia Legislativa do...',
        data_publicacao: '19/10/2023 11:18:07',
      },
    };
    localStorage.setItem('favorites', JSON.stringify(fakeFavorites));
    renderWithRouter(
      <NewsProvider>
        <MainNewsCard />
      </NewsProvider>,
    );
    const fullHeartIcon = screen.getByAltText('favoritar');
    expect(fullHeartIcon).toBeInTheDocument();
  });
  it('exibe o ícone de coração vazio quando o item não está nos favoritos', () => {
    renderWithRouter(
      <NewsProvider>
        <MainNewsCard />
      </NewsProvider>,
    );
    const emptyHeartIcon = screen.getByAltText('favoritar');
    expect(emptyHeartIcon).toBeInTheDocument();
  });
  it('salva um item no localStorage quando a função handleFavorites é chamada', () => {
    renderWithRouter(
      <NewsProvider>
        <MainNewsCard />
      </NewsProvider>,
    );
    const favoriteButton = screen.getByRole('button', { name: /favoritar/i });
    userEvent.click(favoriteButton);
    const storageData = localStorage.getItem('favorites');

    expect(storageData).toBeNull();
  });
});
