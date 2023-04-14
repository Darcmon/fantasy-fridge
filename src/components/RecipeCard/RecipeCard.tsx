import React from 'react';
import FridgeEdit from '../FridgeEdit/FridgeEdit';
import CartEdit from '../CartEdit/CartEdit';
import { User } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

import { Card, Image, Text, Group, Badge, createStyles, Center, Button, rem } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import Ingredient from '../../interfaces/page';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
  },
}));

interface RecipeCardProps {
    user: User;
    item: Ingredient;
  }

const RecipeCard: React.FC<RecipeCardProps> = ({user, item}) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
<Card withBorder radius="md" className={classes.card}>
  <Card.Section className={classes.imageSection}>
    <Image height={rem(200)} fit='contain' src={item.image} alt={`${item.title} picture`} />
  </Card.Section>

  <Card.Section className={classes.section}>
    <div onClick={() => navigate(`/recipes/${item.id}`)}>
      <Text fw={500}>{item.title}</Text>
      <p>Source: {item.sourceName}</p>
      {/* <p>Ready in: {item.readyInMinutes} minutes</p> */}
      <p>Servings: {item.servings}</p>
    </div>
  </Card.Section>
</Card>

  );
}

export default RecipeCard;