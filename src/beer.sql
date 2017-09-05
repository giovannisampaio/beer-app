--run on console with psql \set doc `cat ./products.json`
-- then use  json_to_recordset(:'doc')

-- create table mytable as select * from json_to_recordset('[...]') as s(a integer, b text);
create table beer_table
as select * from json_to_recordset(:'doc') as s(
    "nr" integer,
    "Artikelid" integer,
    "Varnummer" integer,
    "Namn" text,
    "Namn2" text,
    "Prisinklmoms" numeric,
    "Volymiml" integer,
    "PrisPerLiter" numeric,
    "Saljstart" date,
    "Utgått" integer,
    "Varugrupp" text,
    "Typ" text,
    "Stil" text,
    "Forpackning" text,
    "Forslutning" text,
    "Ursprung" text,
    "Ursprunglandnamn" text,
    "Producent" text,
    "Leverantor" text,
    "Argang" text,
    "Provadargang" text,
    "Alkoholhalt" text,
    "Sortiment" text,
    "SortimentText" text,
    "Ekologisk" integer,
    "Etiskt" integer,
    "Koscher" integer
    );



