import React from 'react';
import FridgeEdit from '../FridgeEdit/FridgeEdit';
import CartEdit from '../CartEdit/CartEdit';
import { User } from 'firebase/auth';
import { useParams, useNavigate } from "react-router-dom";

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

interface FeaturesCardProps {
    user: User;
    item: Ingredient;
  }

const FeaturesCard: React.FC<FeaturesCardProps> = ({user, item}) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image height={rem(100)} fit='contain' src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`} alt={`${item.name} picture`} />
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group position='center'>
          <Text fw={500}>{item.name}</Text>
          <Button compact onClick={() => navigate(`/ingredients/${item.id}`)}>View</Button>
      </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group position='center'>
        <FridgeEdit user={user} item={item}/>

          <CartEdit user={user} item={item} />
        </Group>
      </Card.Section>
    </Card>
  );
}

export default FeaturesCard;