/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var beer = sequelize.define('beer', {
    nr: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true

    },
    Artikelid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Varnummer: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Namn: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Namn2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Prisinklmoms: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Volymiml: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PrisPerLiter: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Saljstart: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Utg: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Varugrupp: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Typ: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Stil: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Forpackning: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Forslutning: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Ursprung: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Ursprunglandnamn: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Producent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Leverantor: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Argang: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Provadargang: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Alkoholhalt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Sortiment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    SortimentText: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Ekologisk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Etiskt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Koscher: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    beer_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    beer_label: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    beer_label_hd: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    beer_abv: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    beer_ibu: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    beer_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    beer_style: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_in_production: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    beer_slug: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_homebrew: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rating_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rating_score: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    stats: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    brewery: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    auth_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wish_list: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    weighted_rating_score: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    vintages: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'beers'
  });

  return beer;
};
