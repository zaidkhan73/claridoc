--Enable UUID extension
CREATE EXTENSION IF NOT exists "uuid-ossp";

--create table
CREATE TABLE users (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   email VARCHAR(225) unique not null,
   createdAt timestamp with time zone DEFAULT current_timestamp,
   updatedAt timestamp with time zone DEFAULT current_timestamp,
   full_name VARCHAR(255),
   customer_id VARCHAR(255) unique,
   price_id varchar(255),
   status varchar(50) DEFAULT 'inactive'
);

create TABLE pdf_summaries(
  id uuid PRIMARY key default uuid_generate_v4(),
  user_id VARCHAR(225) not null,
  original_file_url text not null,
  summary_text text not null,
  status VARCHAR(50) default 'completed',
  title text,
  file_name text,
  createdAt timestamp with time zone DEFAULT current_timestamp,
   updatedAt timestamp with time zone DEFAULT current_timestamp
);

create table payment(
   id uuid PRIMARY key default uuid_generate_v4(),
   amount integer not null,
   status VARCHAR(50) not null,
   stripe_payment_id varchar(255) unique not null,
   price_id varchar(255) not null,
   user_email varchar(255) not null references users(email),
   createdAt timestamp with time zone DEFAULT current_timestamp,
   updatedAt timestamp with time zone DEFAULT current_timestamp
);

--create updatedAt trigger function
create or replace function update_updated_at_column()
return trigger as $$
begin
  new.updated_at = current_timestamp;
  return new;
end;
$$ language 'plpgsql'

--add triggers to update updated_at
create trigger update_users_updated_at
   before update on users
   for each row
   execute function update_updated_at_column();

create trigger update_pdf_summaries_updated_at
   before update on pdf_summaries
   for each row
   execute function update_updated_at_column();

create trigger update_payments_updated_at
   before update on payments
   for each row
   execute function update_updated_at_column();