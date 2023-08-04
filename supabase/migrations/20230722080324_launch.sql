-- User Registration and Authentication
create table users (
  id uuid primary key,
  email text unique,
  password text,
  google_id text,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);

-- User Profile Management
create table user_profiles (
  id uuid primary key,
  user_id uuid references users(id) not null unique,
  full_name text,
  company_name text,
  avatar_url text,
  timezone text
);

-- Project Management
create table projects (
  id uuid primary key,
  user_id uuid references users(id) not null,
  title text,
  description text,
  status text,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);

-- Queue System
create table queues (
  id uuid primary key,
  project_id uuid references projects(id) not null,
  editor_id uuid references users(id) not null,
  status text,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);

-- Feedback and Communication
create table feedback (
  id uuid primary key,
  user_id uuid references users(id) not null,  -- Make sure 'user_id' is defined correctly
  project_id uuid references projects(id) not null,
  feedback text,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);

-- Subscription Management
create table subscriptions (
  id uuid primary key,
  user_id uuid references users(id) not null,
  plan_id text,
  start_date timestamp with time zone default current_timestamp,
  end_date timestamp with time zone
);

-- Marketplace
create table marketplace_items (
  id uuid primary key,
  user_id uuid references users(id) not null,
  title text,
  description text,
  price integer,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);

-- Forum or Community
create table forum_posts (
  id uuid primary key,
  user_id uuid references users(id) not null,
  title text,
  content text,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);

-- Blog or News
create table blog_posts (
  id uuid primary key,
  user_id uuid references users(id) not null,
  title text,
  content text,
  published_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);

-- Help and Support
create table support_tickets (
  id uuid primary key,
  user_id uuid references users(id) not null,
  subject text,
  description text,
  status text,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);

-- Analytics and Metrics
create table analytics (
  id uuid primary key,
  user_id uuid references users(id) not null,
  app_usage integer,
  user_engagement integer,
  kp_indicators text,
  reports text,
  insights text
);

-- STORAGE
create table storage (
  id uuid primary key,
  user_id uuid references users(id) not null,
  file_name text,
  file_size integer,
  uploaded_at timestamp with time zone default current_timestamp,
  storage_class text,
  object_lifecycle text,
  source text,
  destination text,
  permissions text
);

-- Notifications
create table notifications (
  id uuid primary key,
  user_id uuid references users(id) not null,
  event_type text,
  event_id uuid,
  message text,
  created_at timestamp with time zone default current_timestamp
);

-- RELATIONSHIPS

-- User Registration and Authentication
alter table user_profiles
  add constraint user_profiles_user_id_fk
    foreign key (user_id)
    references users (id)
    on delete cascade;

-- Project Management
alter table projects
  add constraint projects_user_id_fk
    foreign key (user_id)
    references users (id)
    on delete cascade;

-- Queue System
alter table queues
  add constraint queues_project_id_fk
    foreign key (project_id)
    references projects (id)
    on delete cascade;

alter table queues
  add constraint queues_editor_id_fk
    foreign key (editor_id)
    references users (id)
    on delete cascade;

-- Feedback and Communication
alter table feedback
  add constraint feedback_project_id_fk
    foreign key (project_id)
    references projects (id)
    on delete cascade;

-- Subscription Management
alter table subscriptions
  add constraint subscriptions_user_id_fk
    foreign key (user_id)
    references users (id)
    on delete cascade;

-- Marketplace
alter table marketplace_items
  add constraint marketplace_items_user_id_fk
    foreign key (user_id)
    references users (id)
    on delete cascade;

-- Forum or Community
alter table forum_posts
  add constraint forum_posts_user_id_fk
    foreign key (user_id)
    references users (id)
    on delete cascade;

-- Blog or News
alter table blog_posts
  add constraint blog_posts_user_id_fk
    foreign key (user_id)
    references users (id)
    on delete cascade;

-- Help and Support
alter table support_tickets
  add constraint support_tickets_user_id_fk
    foreign key (user_id)
    references users (id)
    on delete cascade;

-- Analytics and Metrics
alter table analytics
  add constraint analytics_user_id_fk
    foreign key (user_id)
    references users (id)
    on delete cascade;

-- Notifications
alter table notifications
  add constraint notifications_user_id_fk
    foreign key (user_id)
    references users (id)
    on delete cascade;

-- POLICIES --------------------------------------------------------------------

-- User Registration and Authentication
-- Users can create their own accounts.
create policy "Users can create accounts." on users
  for insert with check (email not in (select email from users));

-- Users can update their own account information.
create policy "Users can update their own account information." on users
  for update using (auth.uid() = id);

-- Users can sign in with email and password.
create policy "Users can sign in with email and password." on users
  for select using (email is not null and password is not null);

-- Users can sign in with Google.
create policy "Users can sign in with Google." on users
  for select using (google_id is not null);

-- User Profile Management
-- Users can view their own profile information.
create policy "Users can view their own profile information." on user_profiles
  for select using (user_id = auth.uid());

-- Users can update their own profile information.
create policy "Users can update their own profile information." on user_profiles
  for update using (user_id = auth.uid());

-- Project Management
-- Users can create projects.
create policy "Users can create projects." on projects
  for insert with check (user_id = auth.uid());

-- Users can view projects they have created.
create policy "Users can view their own projects." on projects
  for select using (user_id = auth.uid());

-- Users can update projects they have created.
create policy "Users can update their own projects." on projects
  for update using (user_id = auth.uid());

-- Queue System
-- Users can submit projects to the queue.
create policy "Users can submit projects to the queue." on queues
  for insert with check (editor_id = auth.uid());

-- Users can view projects in the queue.
create policy "Users can view projects in the queue." on queues
  for select;

-- Feedback and Communication
-- Users can submit feedback.
create policy "Users can submit feedback." on feedback
  for insert with check (user_id = auth.uid());

-- Users can view feedback for their projects.
create policy "Users can view feedback for their projects." on feedback
  for select using (project_id in (select id from projects where user_id = auth.uid()));

-- Subscription Management
-- Users can purchase subscriptions.
create policy "Users can purchase subscriptions." on subscriptions
  for insert;

-- Users can view their own subscriptions.
create policy "Users can view their own subscriptions." on subscriptions
  for select using (user_id = auth.uid());

-- Marketplace
-- Users can view marketplace items.
create policy "Users can view marketplace items." on marketplace_items
  for select;

-- Users can purchase marketplace items.
create policy "Users can purchase marketplace items." on marketplace_items
  for insert;

-- Forum or Community
-- Users can create forum posts.
create policy "Users can create forum posts." on forum_posts
  for insert with check (user_id = auth.uid());

-- Users can view forum posts.
create policy "Users can view forum posts." on forum_posts
  for select;

-- Blog or News
-- Users can view blog posts.
create policy "Users can view blog posts." on blog_posts
  for select;

-- Help and Support
-- Users can create support tickets.
create policy "Users can create support tickets." on support_tickets
  for insert with check (user_id = auth.uid());

-- Users can view their own support tickets.
create policy "Users can view their own support tickets." on support_tickets
  for select using (user_id = auth.uid());

-- Analytics and Metrics
-- Users can view analytics data.
create policy "Users can view analytics data." on analytics
  for select;

-- Notifications
-- Users can view their own notifications.
create policy "Users can view their own notifications." on notifications
  for select using (user_id = auth.uid());

-- END --------------------------------------------------------------------
