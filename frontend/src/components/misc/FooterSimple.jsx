import { Container, Group, Anchor } from '@mantine/core';
import classes from './FooterSimple.module.css';
import MyIcon from './svgviewer-react-output';

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Careers' },
];

export function FooterSimple() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <MyIcon width={28} height={28} />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}