import 'styles/main.scss';
import { updateHeader } from 'components/header/header-component';
import { updateArticles } from 'components/articles/articles-component';

updateHeader({ title: 'Theatrum Mundi - Inicio', active: 'home' });
updateArticles();
