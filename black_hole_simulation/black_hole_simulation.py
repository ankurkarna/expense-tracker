import pyvista as pv
import numpy as np

# --- Parameters ---
M_BH = 1.0
R_S = 1.0
N_PARTICLES = 3000
DISK_INNER_R = R_S * 2.5
DISK_OUTER_R = R_S * 12
N_RAYS = 100
STAR_POS = np.array([0, DISK_OUTER_R * 1.5, 0])
GRID_SIZE = 30
GRID_EXTENT = DISK_OUTER_R * 1.5
N_FRAMES = 200
DT = 0.02

# --- Setup Functions ---
def create_actors():
    """Create all the PyVista actors for the scene."""
    # Black Hole
    black_hole = pv.Sphere(radius=R_S, center=(0, 0, 0))
    black_hole_actor = plotter.add_mesh(black_hole, color='black')

    # Accretion Disk
    radius = np.random.uniform(DISK_INNER_R, DISK_OUTER_R, N_PARTICLES)
    angle = np.random.uniform(0, 2 * np.pi, N_PARTICLES)
    x = radius * np.cos(angle)
    y = radius * np.sin(angle)
    z = np.random.uniform(-0.1, 0.1, N_PARTICLES)
    disk_points = np.vstack([x, y, z]).T
    disk_mesh = pv.PolyData(disk_points)
    disk_mesh['radius'] = radius
    disk_actor = plotter.add_mesh(disk_mesh, cmap='hot', scalars='radius', render_points_as_spheres=True, point_size=3)

    # Spacetime Grid
    x_grid = np.linspace(-GRID_EXTENT, GRID_EXTENT, GRID_SIZE)
    y_grid = np.linspace(-GRID_EXTENT, GRID_EXTENT, GRID_SIZE)
    X, Y = np.meshgrid(x_grid, y_grid)
    R = np.sqrt(X**2 + Y**2)
    Z = -M_BH * 30 / (R + 1e-6)
    Z[Z < -GRID_EXTENT / 2] = -GRID_EXTENT / 2
    grid_mesh = pv.StructuredGrid(X, Y, Z)
    grid_actor = plotter.add_mesh(grid_mesh, style='wireframe', color='gray', opacity=0.5)

    return disk_mesh, None # Returning None for rays actor for now

# --- Physics Calculation ---
def calculate_ray_trajectories():
    start_pos = np.tile(STAR_POS, (N_RAYS, 1))
    target_points = np.random.uniform(-DISK_OUTER_R/2, DISK_OUTER_R/2, size=(N_RAYS, 2))
    target_points = np.insert(target_points, 2, 0, axis=1)
    directions = target_points - start_pos
    directions /= np.linalg.norm(directions, axis=1)[:, np.newaxis]
    velocities = directions

    trajectories = []
    for i in range(N_RAYS):
        pos = start_pos[i].copy()
        vel = velocities[i].copy()
        traj = [pos.copy()]
        for _ in range(N_FRAMES * 2):
            r_vec = pos
            r = np.linalg.norm(r_vec)
            if r < R_S or r > GRID_EXTENT * 2:
                break
            acc = -M_BH / r**3 * r_vec
            vel += acc * DT
            pos += vel * DT
            traj.append(pos.copy())
        trajectories.append(np.array(traj))
    return trajectories

# --- Plotting and Animation ---
pv.set_plot_theme('dark')
plotter = pv.Plotter(window_size=[1200, 1000])

disk_mesh, _ = create_actors()
trajectories = calculate_ray_trajectories()

# Add a star
plotter.add_mesh(pv.Sphere(radius=R_S*0.5, center=STAR_POS), color='yellow')

plotter.camera_position = 'xy'
plotter.camera.elevation = 30


print("Starting animation... Close the window to stop.")

plotter.open_movie('black_hole_simulation.mp4', framerate=30)

# Manually create actors for rays to update them
ray_actors = []
for traj in trajectories:
    line = pv.Spline(traj, 100)
    actor = plotter.add_mesh(line, color='cyan', line_width=3)
    ray_actors.append(actor)

plotter.write_frame()

for frame in range(1, N_FRAMES):
    # This is a simplified animation loop. PyVista's movie maker is not easily dynamic.
    # A more complex, real-time animation would require a different approach (e.g., callbacks).
    
    # For this example, we pre-calculate and show the static scene.
    # The animation is created by the camera rotation in the movie.
    plotter.camera.azimuth += 1
    plotter.write_frame()

plotter.close()

print("Animation saved to black_hole_simulation.mp4")